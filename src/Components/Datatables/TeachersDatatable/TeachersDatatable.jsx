import "./TeachersDatatable.scss"
import {DataGrid} from '@mui/x-data-grid';
import React, {useEffect, useState} from "react";
import Axios from "axios";
import {Link} from "react-router-dom";
import ConfirmModal from "../../Modal/ConfirmModal/ConfirmModal";

const columns = [
    {field: 'id', headerName: 'Id', width: 100},
    {field: 'applicationUserId', headerName: 'Application User id', width: 150},
    {field: 'terminated', headerName: 'Terminated', width: 150},
];

export function TeachersDatatable() {

    const [url, setUrl] = useState("");

    const [teachers, setTeachers] = useState([]);

    const [loaded, setLoaded] = useState(false);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (loaded) {
            return;
        }
        Axios.get("https://localhost:7153/Teachers")
            .then(
                (res) => {
                    setTeachers(res?.data)
                });
        setLoaded(true);
    })

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={"/teachers/view/" + params.row.id} style={{textDecoration: "none"}}>
                            <div className="viewButton">View</div>
                        </Link>
                        <Link to={"/teachers/edit/" + params.row.id} style={{textDecoration: "none"}}>
                            <div className="editButton">Edit</div>
                        </Link>
                        <div className="deleteButton" onClick={() => {
                            setShowModal(true);
                            setUrl("https://localhost:7153/Teachers?id=" + params.row.id)
                        }}>Delete
                        </div>
                    </div>
                )
            }
        }
    ]
    return (
        <div className="data">
            <div className="datatable">
                <DataGrid
                    rows={teachers}
                    columns={columns.concat(actionColumn)}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </div>
            <ConfirmModal
                open={showModal}
                onClose={() => setShowModal(false)}
                text="Are you sure to delete teacher?"
                url={url}
                loaded={() => setLoaded(false)}
            />
        </div>
    )
}