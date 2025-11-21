"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const handle_1 = require("./handle");
const Button_1 = require("../ds/Button");
const toast_1 = require("../toast/toast");
const page = () => {
    const inputField = "border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400";
    const [message, formAction] = (0, react_1.useActionState)(handle_1.handleLoginSubmit, null);
    const [formValues, setFormValues] = (0, react_1.useState)({
        username: "",
        password: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };
    const resetformValues = () => {
        setFormValues({
            username: "",
            password: "",
        });
    };
    (0, react_1.useEffect)(() => {
        if (message?.status === "success") {
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
                <div className="bg-white px-8 py-10 shadow-lg border-2 border-gray-100 rounded-md w-[25rem] ">
                    <div className="text-4xl font-semibold text-center mb-5">Login</div>
                    <form action={formAction}>
                        <div className="flex flex-col mb-4">
                            <input name="username" value={formValues.username} onChange={handleChange} placeholder="Username" className={inputField}/>
                           {message?.errors?.username && (<p className="text-xs text-red-500">{message.errors.username}</p>)}
                        </div>
                        <div className="flex flex-col mb-1">
                           <input name="password" type="password" value={formValues.password} onChange={handleChange} placeholder="Password" className={inputField}/>
                            {message?.errors?.password && (<p className="text-xs text-red-500">{message.errors.password}</p>)}
                        </div>
                        
                        <div className="flex justify-end ">
                            <a href="/register" className="text-sm font-semibold hover:underline">
                                Register?
                            </a>
                        </div>
                        <Button_1.Button className="w-full bg-blue-500 mt-4 text-white px-4 py-2 hover:bg-blue-600 transition" text="Login"/>
                    </form>
                </div>
            </div>

        </>);
};
exports.default = page;
