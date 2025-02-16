import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { toast } from "react-hot-toast";


function Todos() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [allTodos, setTodos] = useState([]);

    const [complete, setComplete] = useState("Complete");


    // filtered todos 

    let filteredTodos = allTodos.filter((todos)=> todos.status === complete);

    // Fetch Todos
    useEffect(() => {
        async function fetchAllTodos() {
            try {
                const response = await axios.get("http://localhost:4000/getAllTodos");

                console.log("All todos ", response);

                setTodos(response.data.data); // Update state with fetched todos

                toast.success("Todos fetched successfully")

            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        }
        fetchAllTodos();
    }, []);

    // Add Todo
    async function addTodoHandler() {
        if (!title || !description) {
            alert("Please enter title and description");
            return;
        }

        const newTodo = {
            title,
            description,
            status: "inComplete",
            userId: uuidv4(),
        };

        try {
            const response = await axios.post("http://localhost:4000/create-todo", newTodo);

            console.log(response.data.data);

            setTodos([...allTodos, response.data.data]); // Add new todo to state

            setTitle("");
            setDescription("");

        } catch (error) {
            console.error("Error adding todo:", error);
        }
    }

    // Delete Todo
    async function deleteTodoHandler(id) {
        try {
            await axios.get(`http://localhost:4000/delete-todo/${id}`);
            setTodos(allTodos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    }

    // Toggle Completion Status
    async function toggleCompleteHandler(todo) {
        const updatedStatus = todo.status === "inComplete" ? "Complete" : "inComplete";
        try {
            await axios.put(`http://localhost:4000/update-todo-status`, {
                id: todo._id,
                status: updatedStatus,
            });
            setTodos(allTodos.map(t => (t._id === todo._id ? { ...t, status: updatedStatus } : t)));

            toast.success("Status updated successfully")

        } catch (error) {
            console.error("Error updating status:", error);
        }
    }

    return (
        <div className="flex gap-7 p-5">
            {/* Input Section */}
            <div className="flex flex-col w-80 bg-gray-300 p-5 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-3">Add Todo</h2>

                <label className="mb-1">Title:</label>
                <input
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-2 rounded-lg border mb-3"
                />

                <label className="mb-1">Description:</label>
                <textarea
                    rows={3}
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-2 rounded-lg border mb-3"
                />

                <button onClick={addTodoHandler} className="px-4 py-2 bg-indigo-500 text-white rounded-lg">
                    Add Todo
                </button>
            </div>

            

            {/* Display Todos */}


            <div className="flex flex-col w-full">
                <h2 className="text-lg font-semibold mb-3">All Todos</h2>

                <div className="space-y-3 relative flex flex-wrap w-full gap-7 p-3">
                    {

                        allTodos.length > 0 && allTodos.map((todo) => (

                            <div key={todo._id} className="flex flex-col bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-semibold">{todo.title}</h3>
                                <p className="text-gray-600">{todo.description}</p>

                                <div className="flex gap-3 mt-3">
                                    <button
                                        onClick={() => toggleCompleteHandler(todo)}
                                        className={`px-3 py-1 rounded-lg text-white ${todo.status === "Complete" ? "bg-green-500" : "bg-yellow-500"}`}
                                    >
                                        {todo.status === "Complete" ? "Completed" : "Mark Complete"}
                                    </button>

                                    <button
                                        onClick={() => deleteTodoHandler(todo._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>


            {/*  filetering of todos  */}

            <div className="flex flex-col w-full">
                <h2 className="text-lg font-semibold mb-3">Filter Todos</h2>

                <select onChange={(e) => setComplete(e.target.value)} className="p-2 rounded-lg border mb-3">

                    <option value="Complete">Complete</option>
                    <option value="inComplete">Incomplete</option>

                </select>

                <div className="space-y-3 relative flex flex-wrap w-full gap-7 p-3">
                    {

                        filteredTodos.length > 0 && filteredTodos.map((todo) => (

                            <div key={todo._id} className="flex flex-col bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-semibold">{todo.title}</h3>
                                <p className="text-gray-600">{todo.description}</p>

                                <div className="flex gap-3 mt-3">
                                    <button
                                        onClick={() => toggleCompleteHandler(todo)}
                                        className={`px-3 py-1 rounded-lg text-white ${todo.status === "Complete" ? "bg-green-500" : "bg-yellow-500"}`}
                                    >
                                        {todo.status === "Complete" ? "Completed" : "Mark Complete"}
                                    </button>

                                    <button
                                        onClick={() => deleteTodoHandler(todo._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    );
}

export default Todos;
