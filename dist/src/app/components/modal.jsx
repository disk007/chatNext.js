"use client";
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = modalAddChat;
exports.ModalJoinChat = ModalJoinChat;
exports.ModalMembers = ModalMembers;
exports.ModalApproveMembers = ModalApproveMembers;
exports.ModalChageGroupName = ModalChageGroupName;
const react_1 = __importStar(require("react"));
const react_2 = require("react");
const react_dom_1 = require("react-dom");
const Button_1 = require("../ds/Button");
const addRoomChat_1 = require("./action/addRoomChat");
const toast_1 = require("../toast/toast");
const joinChatRoom_1 = require("./action/joinChatRoom");
const useMenuChat_1 = require("../hook/useMenuChat");
const useModalRoot_1 = require("../hook/useModalRoot");
const actionMembers_1 = require("./action/actionMembers");
const updateGroup_1 = require("./action/updateGroup");
const useDetailChat_1 = require("../hook/useDetailChat");
;
function modalAddChat({ title, onClose, placeholder }) {
    const [container, setContainer] = react_1.default.useState(null);
    const [formValues, setFormValues] = (0, react_1.useState)({
        room: "",
    });
    const [message, formAction] = (0, react_1.useActionState)(addRoomChat_1.handleAddRoom, null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };
    const resetformValues = () => {
        setFormValues({
            room: "",
        });
        onClose();
    };
    (0, react_2.useEffect)(() => {
        let el = document.getElementById("modal-root");
        if (!el) {
            el = document.createElement("div");
            el.id = "modal-root";
            document.body.appendChild(el);
        }
        setContainer(el);
    }, []);
    (0, react_2.useEffect)(() => {
        if (message?.status === "success") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.SUCCESS, message.message);
            resetformValues();
        }
        else if (message?.status === "error") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.ERROR, message.message);
        }
    }, [message]);
    if (!container)
        return null;
    return (0, react_dom_1.createPortal)(<div className={`fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50`}>
      <div className={`bg-[#1E293B] text-[#E2E8F0] rounded-2xl p-6 w-full max-w-sm`}>
        <div className="text-lg font-semibold mb-2 text-[#38BDF8]">
          {title}
        </div>
        <form className="flex flex-col">
          <div className="w-full mb-4">
            <input name="room" placeholder={placeholder} value={formValues.room} onChange={handleChange} className="w-full px-3 py-3 rounded bg-[#334155] border border-[#475569] focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-colors text-white"/>
            {message?.errors?.room && (<p className="text-xs mt-1 text-red-500">{message.errors.room}</p>)}
          </div>
          <div className="flex justify-end space-x-3 mt-2">
            <button onClick={onClose} className="cursor-pointer px-4 py-2 rounded bg-[#334155] hover:bg-[#475569] transition-colors">
              Cancel
            </button>
            <Button_1.Button type="submit" text="Add" className="px-4 py-2 rounded bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold transition-colors"/>
          </div>
        </form>
      </div>
    </div>, container);
}
function ModalJoinChat({ title, onClose, placeholder }) {
    const container = (0, useModalRoot_1.useModalRoot)();
    const [formValues, setFormValues] = (0, react_1.useState)({
        code: "",
    });
    const [message, formAction] = (0, react_1.useActionState)(joinChatRoom_1.JoinChatRoom, null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };
    const resetformValues = () => {
        setFormValues({
            code: "",
        });
        onClose();
    };
    (0, react_2.useEffect)(() => {
        if (message?.status === "success") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.SUCCESS, message.message);
            resetformValues();
        }
        else if (message?.status === "error") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.ERROR, message.message);
        }
        else if (message?.status === "warning") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.WARNING, message.message);
        }
    }, [message]);
    if (!container)
        return null;
    return (0, react_dom_1.createPortal)(<div className={`fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50`}>
      <div className={`bg-[#1E293B] text-[#E2E8F0] rounded-2xl p-6 w-full max-w-sm`}>
        <div className="text-lg font-semibold mb-2 text-[#38BDF8]">
          {title}
        </div>
        <form className="flex flex-col" action={formAction}>
          <div className="w-full mb-4">
            <input name="code" placeholder={placeholder} value={formValues.code} onChange={handleChange} className="w-full px-3 py-3 rounded bg-[#334155] border border-[#475569] focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-colors text-white"/>
            {message?.errors?.code && (<p className="text-xs mt-1 text-red-500">{message.errors.code}</p>)}
          </div>
          <div className="flex justify-end space-x-3 mt-2">
            <button onClick={onClose} className="cursor-pointer px-4 py-2 rounded bg-[#334155] hover:bg-[#475569] transition-colors">
              Cancel
            </button>
            <Button_1.Button type="submit" text="Join" className="px-4 py-2 rounded bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold transition-colors"/>
          </div>
        </form>
      </div>
    </div>, container);
}
function ModalMembers({ title, roomId, onClose, role }) {
    const { members, isLoading, fetchMembers } = (0, useMenuChat_1.useMembers)({ roomId });
    const container = (0, useModalRoot_1.useModalRoot)();
    const [message, formAction] = (0, react_1.useActionState)(actionMembers_1.actionMembers, null);
    const [actionType, setActionType] = (0, react_1.useState)('');
    const [selected, setSelected] = (0, react_1.useState)([]);
    const handleToggle = (id) => {
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };
    (0, react_2.useEffect)(() => {
        if (message?.status === "success") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.SUCCESS, message.message);
            fetchMembers();
            // resetformValues();
        }
        else if (message?.status === "error") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.ERROR, message.message);
        }
        else if (message?.status === "warning") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.WARNING, message.message);
        }
    }, [message]);
    if (!container)
        return null;
    return (0, react_dom_1.createPortal)(<div className={`fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50`}>
      <div className={`bg-[#1E293B] text-[#E2E8F0] rounded-2xl p-6 w-full max-w-sm`}>
        <form action={formAction}>
          <div className="text-lg font-semibold mb-2 text-[#38BDF8]">
            {title}
          </div>
          <div className="max-h-80 overflow-y-auto space-y-3">
            {isLoading ? (<div className="p-4 text-center animate-pulse text-gray-400">
                Loading...
              </div>) : ((members?.map((data, index) => (<div key={index} className="flex items-center justify-between bg-[#334155] hover:bg-[#475569] p-3 rounded-lg transition-colors duration-200">
                  <span className="text-sm text-[#E2E8F0] font-medium">{data.user.username}</span>
                {role == "admin" &&
                <input type="checkbox" checked={selected.includes(data.user.id)} name="selected" value={data.user.id} onChange={() => handleToggle(data.user.id)} className="appearance-none h-5 w-5 border-2 border-[#38BDF8] rounded-md checked:bg-[#38BDF8] transition-all duration-200 cursor-pointer"/>}
                </div>))))}

          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <input type="hidden" name="actionType" value={actionType}/>
            <input type="hidden" name="roomId" value={roomId}/>
            <button onClick={onClose} className="cursor-pointer px-4 py-2 rounded bg-[#334155] hover:bg-[#475569] transition-colors">
              Cancel
            </button>
            {role == "admin" &&
            <Button_1.Button type="submit" text="Delete" onClick={() => setActionType("reject")} disabled={selected.length === 0} // ถ้ายังไม่เลือกให้ disable
             className={`px-4 py-2 rounded font-semibold transition-colors ${selected.length === 0
                    ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 text-white"}`}/>}
          </div>
        </form>
      </div>
    </div>, container);
}
function ModalApproveMembers({ title, roomId, onClose }) {
    const { members, isLoading, fetchMembers } = (0, useMenuChat_1.useApproveMembers)({ roomId });
    const container = (0, useModalRoot_1.useModalRoot)();
    const [actionType, setActionType] = (0, react_1.useState)('');
    const [message, formAction] = (0, react_1.useActionState)(actionMembers_1.actionMembers, null);
    const [selected, setSelected] = (0, react_1.useState)([]);
    const handleToggle = (id) => {
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };
    (0, react_2.useEffect)(() => {
        if (message?.status === "success") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.SUCCESS, message.message);
            fetchMembers();
            // resetformValues();
        }
        else if (message?.status === "error") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.ERROR, message.message);
        }
        else if (message?.status === "warning") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.WARNING, message.message);
        }
    }, [message]);
    if (!container)
        return null;
    return (0, react_dom_1.createPortal)(<div className={`fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50`}>
      <div className={`bg-[#1E293B] text-[#E2E8F0] rounded-2xl p-6 w-full max-w-sm`}>
        <form action={formAction}>
          <div className="text-lg font-semibold mb-2 text-[#38BDF8]">
            {title}
          </div>
          <div className="max-h-80 overflow-y-auto space-y-3">
            {isLoading ? (<div className="p-4 text-center animate-pulse text-gray-400">
                Loading...
              </div>) : ((members?.map((data, index) => (<div key={index} className="flex items-center justify-between bg-[#334155] hover:bg-[#475569] p-3 rounded-lg transition-colors duration-200">
                  <span className="text-sm text-[#E2E8F0] font-medium">{data.user.username}</span>

                  <input type="checkbox" checked={selected.includes(data.user.id)} onChange={() => handleToggle(data.user.id)} name="selected" value={data.user.id} className="appearance-none h-5 w-5 border-2 border-[#38BDF8] rounded-md checked:bg-[#38BDF8] transition-all duration-200 cursor-pointer"/>
                </div>))))}
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <input type="hidden" name="actionType" value={actionType}/>
            <input type="hidden" name="roomId" value={roomId}/>
            <button onClick={onClose} className="cursor-pointer px-4 py-2 rounded bg-[#334155] hover:bg-[#475569] transition-colors">
              Cancel
            </button>
            <Button_1.Button type="submit" text="Approve" onClick={() => setActionType("approve")} disabled={selected.length === 0} className={`px-4 py-2 rounded font-semibold transition-colors ${selected.length === 0
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-white"}`}/>

            {/* ปุ่ม Reject */}
            <Button_1.Button type="submit" text="Reject" onClick={() => setActionType("reject")} disabled={selected.length === 0} className={`px-4 py-2 rounded font-semibold transition-colors ${selected.length === 0
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-yellow-500 hover:bg-yellow-600 text-white"}`}/>
          </div>
        </form>
      </div>
    </div>, container);
}
function ModalChageGroupName({ title, name, roomId, onClose }) {
    const container = (0, useModalRoot_1.useModalRoot)();
    const [message, formAction] = (0, react_1.useActionState)(updateGroup_1.updateGroup, null);
    const [newName, setNewName] = (0, react_1.useState)(name);
    const { fetchDetailChat } = (0, useDetailChat_1.useDetailChat)({ roomId });
    (0, react_2.useEffect)(() => {
        if (message?.status === "success") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.SUCCESS, message.message);
            onClose();
            // resetformValues();
        }
        else if (message?.status === "error") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.ERROR, message.message);
        }
        else if (message?.status === "warning") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.WARNING, message.message);
        }
        else if (message?.status === "info") {
            (0, toast_1.showToast)(toast_1.ToastStatusEnum.INFO, message.message);
        }
    }, [message]);
    if (!container)
        return null;
    return (0, react_dom_1.createPortal)(<div className={`fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50`}>
      <div className={`bg-[#1E293B] text-[#E2E8F0] rounded-2xl p-6 w-full max-w-sm`}>
        <form action={formAction}>
          <div className="text-lg font-semibold mb-2 text-[#38BDF8]">
            {title}
          </div>
          <div className="max-h-80 overflow-y-auto space-y-3">
            <input id="name" name="name" type="text" value={newName ?? ""} onChange={(e) => setNewName(e.target.value)} className="w-full p-2 rounded-md bg-[#1E293B] border border-[#38BDF8] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition-all"/>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <input type="hidden" name="roomId" value={roomId}/>
            <button onClick={onClose} className="cursor-pointer px-4 py-2 rounded bg-[#334155] hover:bg-[#475569] transition-colors">
              Cancel
            </button>
            <Button_1.Button type="submit" text="Change" className="px-4 py-2 rounded font-semibold transition-colors bg-[#38BDF8] hover:bg-[#0EA5E9] text-white"/>
          </div>
        </form>
      </div>
    </div>, container);
}
