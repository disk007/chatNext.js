"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendChat_1 = __importDefault(require("./sendChat"));
const PendingApproval_1 = __importDefault(require("./PendingApproval"));
const useDetailChat_1 = require("../hook/useDetailChat");
const menuChat_1 = __importDefault(require("./menuChat"));
const Content = ({ roomId }) => {
    const { detailChat, isLoading } = (0, useDetailChat_1.useDetailChat)({ roomId });
    return (<div className="ml-[450px] h-screen w-[calc(100%-450px)] flex flex-col fixed bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-[#E2E8F0]">
      {isLoading && (<div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-t-[#38BDF8] border-gray-700 rounded-full animate-spin"></div>
            <p className="mt-3 text-gray-400">Loading chat...</p>
          </div>
        </div>)}
      {!isLoading && detailChat && (<>
          {detailChat.isApproved ? (<>
              <div className="p-4 border-2 border-[#1E293B] flex-row flex justify-between items-center">
                <div>
                  {detailChat.name}
                </div>
                <menuChat_1.default roomId={roomId} name={detailChat.name}/>
              </div>
              {detailChat.messages.length === 0 ? (<div className="flex-1 flex flex-col justify-center items-center">
                  <p className="text-gray-500 mb-4">No messages yet. Start the conversation!</p>
                </div>) : (<div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {detailChat.messages.map((msg, key) => (<div key={key}>
                      
                      {/* ข้อความฝั่งซ้าย (คนอื่น) */}
                      {msg.anotherChat == true && (<div className="flex items-start space-x-3">
                          <img src="https://i.pravatar.cc/40?img=1" alt="profile" className="w-10 h-10 rounded-full"/>
                          <div className="bg-gray-700 text-white p-3 rounded-lg max-w-xs">
                            {msg.content}
                          </div>
                        </div>)}

                      {/* ข้อความฝั่งขวา (ตัวเรา) */}
                      {msg.anotherChat == false && (<div className="flex items-start justify-end space-x-3">
                          <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                            {msg.content}
                          </div>
                          <img src="https://i.pravatar.cc/40?img=2" alt="profile" className="w-10 h-10 rounded-full"/>
                        </div>)}
                    </div>))}
                </div>)}
              <sendChat_1.default roomId={roomId}/>
            </>) : (<PendingApproval_1.default />)}
        </>)}
    </div>);
};
exports.default = Content;
