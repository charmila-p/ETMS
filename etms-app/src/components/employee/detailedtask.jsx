import { useLocation, useNavigate } from "react-router-dom";
import EmployeeNavbar from "./navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const DetailedTask = () => {
    const location = useLocation();
    const { task } = location.state;
    const navigate = useNavigate();

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token"); // Get token from localStorage

    //Fetch comments for this task
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/comment/get/${task._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setComments(res.data);
            } catch (error) {
                console.error("Error fetching comments", error);
            }
        };

        fetchComments();
    }, [task._id, token]);

    //Add a new comment
    const addComment = async (event) => {
        event.preventDefault(); // Prevent page reload
        if (!newComment.trim()) return;
        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/comment/add",
                { username: "Anonymous", message: newComment, task: task._id }, // Username is required
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setComments([...comments, res.data]); // Update comments list
            setNewComment(""); // Clear input field
            setMsg("Comment Added Successfully!");
        } catch (error) {
            setMsg("Error in Adding Comment");
            console.error("Error adding comment", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <EmployeeNavbar />
                </div>
            </div>

            <div className="container mt-4 col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h3 className="mb-0">Task Details</h3>
                    </div>
                    <div className="card-body">
                        <h4 className="card-title mb-4">Task: {task.title}</h4>

                        <p className="card-text">
                            <strong>Project: </strong> {task.project.title}
                        </p>

                        <p className="card-text">
                            <strong>Description: </strong> {task.shortDescription}
                        </p>

                        <p className="card-text">
                            <strong>Start Date: </strong> {task.startDate.split("T")[0]}
                        </p>

                        <p className="card-text">
                            <strong>Estimated End Date: </strong> {task.estimatedEndDate.split("T")[0]}
                        </p>

                        <p className="card-text">
                            <strong>Client Name: </strong> {task.project.clientName}
                        </p>

                        <p className="card-text">
                            <strong>Tech Stack: </strong> {task.project.techStack}
                        </p>

                        <button className="btn btn-info mt-3" onClick={() => navigate("/employee/tasks")}>
                            Back to Tasks
                        </button>
                    </div>
                </div>
            </div>

           

            {/* Add Comment Section */}
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="card mt-4 col-md-8">
                    <div className="card-header">
                        <h4>Add a Comment</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={addComment}>
                            <label>Enter new comment:</label>
                            <textarea
                                rows={5}
                                cols={50}
                                className="form-control"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
                                {loading ? "Adding..." : "Add Comment"}
                            </button>
                        </form>
                        {msg && <p className="text-success mt-2">{msg}</p>}
                    </div>
                </div>
            </div>
             {/* Comments Section */}
             <div className="row">
                <div className="col-sm-2"></div>
                <div className="card mt-4 col-md-8">
                    <div className="card-header">
                        <h4>Comments</h4>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            {comments.length === 0 ? (
                                <li className="list-group-item text-muted">No comments yet.</li>
                            ) : (
                                comments.map((comment) => (
                                    <li key={comment._id} className="list-group-item">
                                        <strong>{comment.username}:</strong> {comment.message} <br />
                                        <small className="text-muted">{new Date(comment.commentDate).toLocaleString()}</small>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailedTask;
