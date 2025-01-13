import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import { useAddTermsMutation, useGetTermsQuery } from "../../Redux/Apis/aboutApis";
import { MakeFormData } from "../../Util/MakeFormData";
import toast from "react-hot-toast";

const Terms = () => {
    const editor = useRef(null);
    const [postTerms] = useAddTermsMutation()
    const { data } = useGetTermsQuery()
    const [content, setContent] = useState(data?.description);
    const config = {
        readonly: false,
        placeholder: "Start typings...",
        style: {
            height: 400,
        },
    };
    const handleTerms = () => {
        const data = {
            description: content,
            title: 'About Us',
            _method: 'PUT'
        }
        const formData = MakeFormData(data)
        postTerms(formData).unwrap().then(res => {
            toast.success(res?.message)
        }).catch(err => {
            toast.error(err.data?.message)
        })
    }
    useEffect(() => {
        setContent(data?.description)
    }, [data?.description])
    return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "16px 0",
                }}
            >
                <div>
                    <h3
                        style={{
                            fontSize: 18,
                            fontWeight: "500",
                        }}
                    >
                        Terms & Condition
                    </h3>
                </div>
                <div></div>
            </div>
            <div>
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={(newContent) => { }}
                />
            </div>
            <div
                style={{
                    marginTop: 24,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <button onClick={handleTerms}
                    style={{
                        height: 44,
                        width: 150,
                        backgroundColor: "#F27405",
                        color: "white",
                        borderRadius: "8px",
                        fontWeight: 500,
                        fontSize: 14,
                    }}
                >
                    Save Changes
                </button>
            </div>
        </>
    );
};

export default Terms
