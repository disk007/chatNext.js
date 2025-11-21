"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const handle_1 = require("./handle");
const toast_1 = require("../toast/toast");
const Button_1 = require("../ds/Button");
const page = () => {
    const [formValues, setFormValues] = (0, react_1.useState)({
        username: "",
        password: "",
        cPassword: "",
    });
    const inputField = "border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400";
    const flexCol = "flex flex-col ";
    const [message, formAction] = (0, react_1.useActionState)(handle_1.handleRegisterSubmit, null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };
    const resetformValues = () => {
        setFormValues({
            username: "",
            password: "",
            cPassword: "",
        });
    };
    (0, react_1.useEffect)(() => {
        if (message?.status === "suscess") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.SUCCESS, message.message);
            resetformValues();
        }
        else if (message?.status === "duplicate") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.WARNING, message.message);
        }
        else if (message?.status === "error") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.ERROR, message.message);
        }
    }, [message]);
    return (<>
            <div className="fixed inset-0 grid place-items-center">
                <div className="bg-white px-8 py-10 shadow-lg border-gray-100 rounded-md w-[25rem] ">
                    <div className="text-4xl font-semibold text-center mb-5">Register</div>
                    <form action={formAction}>
                        <div className={`${flexCol} mb-4`}>
                            <input name="username" value={formValues.username} onChange={handleChange} placeholder="Username" className="border border-gray-300 px-4 py-2"/>
                            {message?.errors?.username && (<p className="text-xs text-red-500">{message.errors.username}</p>)}
                        </div>
                        <div className={`${flexCol} mb-4`}>
                            <input name="password" type="password" value={formValues.password} onChange={handleChange} placeholder="Password" className="border border-gray-300 px-4 py-2"/>
                            {message?.errors?.password && (<p className="text-xs text-red-500">{message.errors.password}</p>)}
                        </div>
                        <div className={`${flexCol} mb-1`}>
                            <input name="cPassword" type="password" value={formValues.cPassword} onChange={handleChange} placeholder="Confirm Password" className="border border-gray-300 px-4 py-2"/>
                            {message?.errors?.cPassword && (<p className="text-xs text-red-500">{message.errors.cPassword}</p>)}
                        </div>
                        <div className="flex justify-end ">
                            <a href="/login" className="text-sm font-semibold hover:underline">
                                Login?
                            </a>
                        </div>
                        <Button_1.Button className="w-full bg-blue-500 mt-4 text-white px-4 py-2 hover:bg-blue-600 transition" text="Register"/>
                    </form>
                </div>
            </div>
                
        </>);
};
exports.default = page;
