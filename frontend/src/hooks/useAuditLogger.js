import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { addLogOptimistic, setError, clearError } from '../app/store';
import { auditService } from '../services/auditService';
import toast from 'react-hot-toast';

export function useAuditLogger() {
  const dispatch = useDispatch();

  const logAction = useCallback(async (action, value) => {
    const logEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      action,
      value,
    };

    dispatch(addLogOptimistic(logEntry));
    dispatch(clearError());

    try {
      await auditService.createLog(logEntry);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to log action';
      dispatch(setError(errorMsg));
      toast.error(errorMsg);
    }
  }, [dispatch]);

  return { logAction };
}
