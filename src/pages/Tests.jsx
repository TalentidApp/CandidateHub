import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import { api } from "../lib/api";

const Tests = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, limit: 10 });
  const [sortField, setSortField] = useState("scheduledDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/api/tests?page=${page}&limit=10`);
        const fetchedTests = Array.isArray(response.data.tests) ? response.data.tests : [];
        setTests(fetchedTests);
        setPagination(response.data.pagination || { total: 0, limit: 10 });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch tests");
        setTests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, [page]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
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
    if (statusFilter) result = result.filter((test) => test.status === statusFilter);
    result.sort((a, b) => {
      const aValue = a[sortField] || "";
      const bValue = b[sortField] || "";
      if (sortField === "scheduledDate") {
        const aDate = new Date(aValue);
        const bDate = new Date(bValue);
        return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
      }
      return sortOrder === "asc" ? String(aValue).localeCompare(String(bValue)) : String(bValue).localeCompare(String(aValue));
    });
    return result;
  }, [tests, sortField, sortOrder, statusFilter]);

  const handleTakeTest = (testId) => {
    navigate(`/test/${testId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-200 to-purple-300 text-[#652d96] pb-12">
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
            {error !== "Please log in to view your tests" && (
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
                        <span className="font-medium">Date:</span>{" "}
                        {test.scheduledDate ? new Date(test.scheduledDate).toLocaleDateString() : "N/A"}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Duration:</span> {test.duration || "N/A"} min
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Status:</span>
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs ${
                            test.status === "Pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : test.status === "InProgress"
                              ? "bg-blue-200 text-blue-800"
                              : test.status === "Completed"
                              ? "bg-green-200 text-green-800"
                              : test.status === "Expired"
                              ? "bg-red-200 text-red-800"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {test.status}
                        </span>
                      </p>
                      {test.status === "Pending" && (
                        <button
                          onClick={() => handleTakeTest(test.testId)}
                          className="w-full mt-2 px-4 py-2 bg-[#652d96] text-white rounded-lg hover:bg-[#4b2270] transition-colors focus:ring-2 focus:ring-[#652d96] focus:ring-offset-2"
                        >
                          Take Test
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No tests found.</p>
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      {["jobTitle", "testId", "scheduledDate", "duration", "status"].map((field) => (
                        <th
                          key={field}
                          className="px-6 py-3 text-sm font-semibold text-[#652d96] cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort(field)}
                        >
                          {field === "jobTitle"
                            ? "Job Title"
                            : field === "testId"
                            ? "Test ID"
                            : field === "scheduledDate"
                            ? "Scheduled Date"
                            : field === "duration"
                            ? "Duration"
                            : "Status"}
                          {sortField === field && (
                            <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                          )}
                        </th>
                      ))}
                      <th className="px-6 py-3 text-sm font-semibold text-[#652d96]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAndFilteredTests.length > 0 ? (
                      sortedAndFilteredTests.map((test, index) => (
                        <tr
                          key={test.testId}
                          className="border-t border-gray-200 hover:bg-gray-50 animate-fade-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <td className="px-6 py-4 text-sm">{test.jobTitle}</td>
                          <td className="px-6 py-4 text-sm">{test.testId}</td>
                          <td className="px-6 py-4 text-sm">
                            {test.scheduledDate ? new Date(test.scheduledDate).toLocaleDateString() : "N/A"}
                          </td>
                          <td className="px-6 py-4 text-sm">{test.duration || "N/A"} min</td>
                          <td className="px-6 py-4 text-sm">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                test.status === "Pending"
                                  ? "bg-yellow-200 text-yellow-800"
                                  : test.status === "InProgress"
                                  ? "bg-blue-200 text-blue-800"
                                  : test.status === "Completed"
                                  ? "bg-green-200 text-green-800"
                                  : test.status === "Expired"
                                  ? "bg-red-200 text-red-800"
                                  : "bg-gray-200 text-gray-800"
                              }`}
                            >
                              {test.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            {test.status === "Pending" && (
                              <button
                                onClick={() => handleTakeTest(test.testId)}
                                className="px-4 py-2 bg-[#652d96] text-white rounded-lg hover:bg-[#4b2270] transition-colors focus:ring-2 focus:ring-[#652d96] focus:ring-offset-2"
                              >
                                Take Test
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                          No tests found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {pagination.total > pagination.limit && (
              <div className="p-6 border-t border-gray-200 flex justify-between items-center">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className={`px-4 py-2 rounded-lg ${
                    page === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-[#652d96] text-white hover:bg-[#4b2270]"
                  } transition-colors focus:ring-2 focus:ring-[#652d96] focus:ring-offset-2`}
                >
                  Previous
                </button>
                <span className="text-sm">
                  Page {page} of {Math.ceil(pagination.total / pagination.limit)}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page === Math.ceil(pagination.total / pagination.limit)}
                  className={`px-4 py-2 rounded-lg ${
                    page === Math.ceil(pagination.total / pagination.limit)
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-[#652d96] text-white hover:bg-[#4b2270]"
                  } transition-colors focus:ring-2 focus:ring-[#652d96] focus:ring-offset-2`}
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