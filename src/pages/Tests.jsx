import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import useAuthStore from '../constants/store';
import Header from '../components/common/Header';

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, limit: 10 });
  const [sortField, setSortField] = useState('scheduledDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [statusFilter, setStatusFilter] = useState('');
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/api/tests?page=${page}&limit=10`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        const fetchedTests = Array.isArray(response.data.tests) ? response.data.tests : [];
        setTests(fetchedTests);
        setPagination(response.data.pagination || { total: 0, limit: 10 });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch tests');
        setTests([]);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchTests();
    else {
      setError('Please log in to view your tests');
      setLoading(false);
    }
  }, [page, token]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleNextPage = () => {
    if (page < Math.ceil(pagination.total / pagination.limit)) setPage(page + 1);
  };
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const sortedAndFilteredTests = useMemo(() => {
    let result = [...tests];
    if (statusFilter) result = result.filter(test => test.status === statusFilter);
    result.sort((a, b) => {
      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';
      if (sortField === 'scheduledDate') {
        const aDate = new Date(aValue);
        const bDate = new Date(bValue);
        return sortOrder === 'asc' ? aDate - bDate : bDate - aDate;
      }
      return sortOrder === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
    return result;
  }, [tests, sortField, sortOrder, statusFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-200 to-purple-300 text-[#652d96]  pb-12">
      <Header />
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-[#652d96] text-center">My Tests</h1>

        {loading && (
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-lg mb-8 mx-auto max-w-2xl">
            <p className="text-center">{error}</p>
            {error !== 'Please log in to view your tests' && (
              <button
                onClick={() => {
                  setPage(1);
                  setLoading(true);
                }}
                className="mt-4 mx-auto block px-6 py-2 bg-[#652d96] text-white rounded-lg hover:bg-[#4b2270] transition-colors focus:ring-2 focus:ring-[#652d96] focus:ring-offset-2"
              >
                Retry
              </button>
            )}
          </div>
        )}

        {/* Main Content */}
        {!loading && !error && (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            {/* Filter Section */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <label htmlFor="statusFilter" className="font-semibold text-[#652d96]">
                    Filter by Status:
                  </label>
                  <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#652d96] focus:border-[#652d96] w-full sm:w-48 bg-white text-[#652d96]"
                    aria-label="Filter tests by status"
                  >
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden p-6 space-y-4">
              {sortedAndFilteredTests.length > 0 ? (
                sortedAndFilteredTests.map((test, index) => (
                  <div
                    key={test.testId}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="space-y-2">
                      <p className="font-semibold text-[#652d96]">{test.jobTitle}</p>
                      <p className="text-sm">
                        <span className="font-medium">Test ID:</span> {test.testId}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Date:</span> {test.scheduledDate}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Duration:</span> {test.duration} min
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Status:</span>
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                            test.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : test.status === 'InProgress'
                              ? 'bg-yellow-100 text-yellow-800'
                              : test.status === 'Pending'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {test.status}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Results:</span>
                        {test.status === 'Completed' ? (
                          <span className="block ml-2">
                            Correct: {test.results.correct}/{test.results.total}, Wrong: {test.results.wrong}, No Attempt: {test.results.noAttempt}
                          </span>
                        ) : (
                          ' N/A'
                        )}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Joining Date:</span> {test.joiningDate}
                      </p>
                      <a
                        href={test.testLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-[#652d96] hover:text-[#4b2270] font-medium underline transition-colors"
                        aria-label={`Open test ${test.testId}`}
                      >
                        View Test
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No tests available{statusFilter ? ` for status "${statusFilter}"` : ''}.
                </div>
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200" role="grid">
                <thead className="bg-[#652d96] sticky top-0 z-10">
                  <tr>
                    {[
                      { label: 'Test ID', field: 'testId' },
                      { label: 'Job Title', field: 'jobTitle' },
                      { label: 'Scheduled Date', field: 'scheduledDate' },
                      { label: 'Duration', field: 'duration' },
                      { label: 'Status', field: 'status' },
                      { label: 'Results', field: 'results' },
                      { label: 'Joining Date', field: 'joiningDate' },
                      { label: 'Test Link', field: 'testLink' },
                    ].map(({ label, field }) => (
                      <th
                        key={field}
                        className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider cursor-pointer hover:bg-[#4b2270] transition-colors"
                        onClick={() => handleSort(field)}
                        role="columnheader"
                        aria-sort={sortField === field ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
                      >
                        {label}
                        {sortField === field && (
                          <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedAndFilteredTests.length > 0 ? (
                    sortedAndFilteredTests.map((test, index) => (
                      <tr
                        key={test.testId}
                        className="hover:bg-purple-50 transition-colors animate-fade-in"
                        role="row"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{test.testId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{test.jobTitle}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{test.scheduledDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{test.duration} min</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              test.status === 'Completed'
                                ? 'bg-green-100 text-green-800'
                                : test.status === 'InProgress'
                                ? 'bg-yellow-100 text-yellow-800'
                                : test.status === 'Pending'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {test.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {test.status === 'Completed' ? (
                            <div className="space-y-1">
                              <p>Correct: {test.results.correct}/{test.results.total}</p>
                              <p>Wrong: {test.results.wrong}</p>
                              <p>No Attempt: {test.results.noAttempt}</p>
                            </div>
                          ) : (
                            'N/A'
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{test.joiningDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <a
                            href={test.testLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#652d96] hover:text-[#4b2270] font-medium underline transition-colors"
                            aria-label={`Open test ${test.testId}`}
                          >
                            View Test
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-8 text-center text-gray-500 text-sm">
                        No tests available{statusFilter ? ` for status "${statusFilter}"` : ''}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.total > pagination.limit && (
              <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="px-6 py-2 bg-[#652d96] text-white rounded-lg disabled:opacity-50 hover:bg-[#4b2270] transition-colors focus:ring-2 focus:ring-[#652d96] focus:ring-offset-2"
                  aria-label="Previous page"
                >
                  Previous
                </button>
                <span className="text-sm font-medium text-[#652d96]" aria-live="polite">
                  Page {page} of {Math.ceil(pagination.total / pagination.limit)}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page === Math.ceil(pagination.total / pagination.limit)}
                  className="px-6 py-2 bg-[#652d96] text-white rounded-lg disabled:opacity-50 hover:bg-[#4b2270] transition-colors focus:ring-2 focus:ring-[#652d96] focus:ring-offset-2"
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tests;