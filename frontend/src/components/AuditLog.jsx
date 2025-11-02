import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLogs, setLoading, setError } from '../app/store';
import { auditService } from '../services/auditService';
import toast from 'react-hot-toast';
import { ChevronDown, RefreshCw, Download } from 'lucide-react';

export function AuditLog() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const logsPerPage = 10;

  const dispatch = useDispatch();
  const { logs, loading, error } = useSelector((state) => state.audit);

  // ✅ Fetch logs from API
  const fetchLogs = async () => {
    dispatch(setLoading(true));
    try {
      const response = await auditService.getLogs(logsPerPage, currentPage * logsPerPage);

      // Store only the array of logs
      const fetchedLogs = response.data?.logs || [];
      dispatch(setLogs(fetchedLogs));
      dispatch(setError(null));
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch logs';
      dispatch(setError(errorMsg));
      toast.error(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (isExpanded) {
      fetchLogs();
    }
  }, [isExpanded, currentPage]);

  // ✅ Export logs as CSV
  const exportToCSV = () => {
    if (!Array.isArray(logs) || logs.length === 0) {
      toast.error('No logs to export');
      return;
    }

    const headers = ['ID', 'Timestamp', 'Action', 'Value'];
    const rows = logs.map((log) => [
      log.id,
      new Date(log.timestamp).toLocaleString(),
      log.action,
      log.value,
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach((row) => {
      csv += row.map((cell) => `"${cell}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success('Logs exported successfully');
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      {/* Header / Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-3">
          <ChevronDown
            className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Audit Log 
          </h2>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
              {error}
            </div>
          )}

          
          {/* Logs Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-white">
                    Timestamp
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-white">
                    Action
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-white">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="px-4 py-4 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : !Array.isArray(logs) || logs.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-4 py-4 text-center text-gray-500">
                      No audit logs yet
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        {log.action}
                      </td>
                      <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                        {log.value}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && Array.isArray(logs) && logs.length > 0 && (
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {currentPage * logsPerPage + 1} to{' '}
                {Math.min((currentPage + 1) * logsPerPage, (currentPage) * logsPerPage + logs.length)}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 rounded transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={logs.length < logsPerPage}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 rounded transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AuditLog;
