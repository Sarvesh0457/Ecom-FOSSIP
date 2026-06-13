import { useState, useEffect } from "react";
import { mockCustomers } from "../data/mockCustomers";

export const useCustomers = ({ search = "", status = "" } = {}) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        // Simulating API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        let filtered = [...mockCustomers];

        // Filter by search term
        if (search) {
          filtered = filtered.filter(
            (c) =>
              c.name.toLowerCase().includes(search.toLowerCase()) ||
              c.email.toLowerCase().includes(search.toLowerCase()) ||
              c.phone.includes(search),
          );
        }

        // Filter by status
        if (status) {
          filtered = filtered.filter((c) => c.status === status);
        }

        setCustomers(filtered);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [search, status]);

  return { customers, loading, error, setCustomers };
};
