import { useState } from 'react';
import Avatar from './ui/Avatar';
import Button from './ui/Button';

const ChatWindow = () => {
  const [isSelected] = useState(true);

  if (!isSelected)
    return (
      <div className="w-8/12 flex justify-center items-center">
        <div className="flex flex-col gap-2 justify-center items-center">
          <img src="./logo_white.png" alt="logo" />
          <p className="text-gray-400">
            Send and receive messages without keeping your phone online.
          </p>
        </div>
      </div>
    );

  return (
    <div className="w-8/12 flex flex-col">
      <div className="border-b border-gray-200">
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center gap-2">
            <Avatar src="./user_2.png" userName="Elias Emon" />
            <h2>Elias Emon</h2>
          </div>
          <div className="flex gap-4 items-center">
            <Button onClick={() => {}}>
              <img src="./search_action.png" alt="search" />
            </Button>
            <Button onClick={() => {}}>
              <img src="./three_dot_action.png" alt="dot" />
            </Button>
            <Button onClick={() => {}}>
              <img src="./arrow_action.png" alt="arrow" />
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 flex flex-col gap-6 flex-1 p-4 overflow-y-scroll">
        <div className=" w-8/12 flex items-start gap-2">
          <div>
            <Avatar src="./user_1.png" userName="Elias Emon" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-left text-slate-600 text-sm">4:00 PM</p>
            <div className="bg-slate-200 p-3 rounded-lg text-slate-700">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit
              esse deserunt fugit modi nulla! Doloribus dolore deserunt
              architecto provident mollitia, consequuntur sapiente nobis
              laudantium reiciendis qui voluptatem accusantium in nesciunt?
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Architecto non omnis quod! Doloribus est possimus ullam,
              voluptates architecto atque sequi, eveniet fugiat eaque esse
              dignissimos similique nemo. Excepturi, qui tempore. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Omnis accusamus,
              eaque reprehenderit nulla vel magnam optio impedit a blanditiis
              necessitatibus ex sit? Velit, veniam mollitia sequi quod quas
              voluptate eum.
            </div>
          </div>
        </div>
        <div className=" w-8/12 flex items-start gap-2 self-end">
          {false && (
            <div>
              <Avatar src="./user_1.png" userName="Elias Emon" />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <p className="text-right text-slate-600 text-sm">4:00 PM</p>
            <div className="bg-sky-200 p-3 rounded-lg text-slate-700">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit
              esse deserunt fugit modi nulla! Doloribus dolore deserunt
              architecto provident mollitia, consequuntur sapiente nobis
              laudantium reiciendis qui voluptatem accusantium in nesciunt?
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Architecto non omnis quod! Doloribus est possimus ullam,
              voluptates architecto atque sequi, eveniet fugiat eaque esse
              dignissimos similique nemo. Excepturi, qui tempore. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Omnis accusamus,
              eaque reprehenderit nulla vel magnam optio impedit a blanditiis
              necessitatibus ex sit? Velit, veniam mollitia sequi quod quas
              voluptate eum.
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 flex items-center px-4 py-2">
        <Button onClick={() => {}}>
          <img src="./input_add.png" alt="add button" className="size-7" />
        </Button>
        <input
          type="text"
          placeholder="Type your message here"
          className="flex-1 outline-none bg-slate-200 py-2 px-4 rounded-lg text-slate-600"
        />
        <Button onClick={() => {}}>
          <img src="./input_emoji.png" alt="emoji button" className="size-7" />
        </Button>
        <Button onClick={() => {}}>
          <img
            src="./input_addimage.png"
            alt="add image button"
            className="size-7"
          />
        </Button>
        <Button onClick={() => {}}>
          <img
            src="./input_attachment.png"
            alt="attachment button"
            className="size-7"
          />
        </Button>
        <Button onClick={() => {}}>
          <img
            src="./input_microphone.png"
            alt="microphone button"
            className="size-7"
          />
        </Button>
        <Button onClick={() => {}}>
          <img
            src="./input_send.png"
            alt="send button"
            className="size-10 mx-4"
          />
        </Button>
      </div>
    </div>
  );
};

export default ChatWindow;
