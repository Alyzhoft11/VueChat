import React, { useState } from 'react';
import 'moment';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useStoreState } from 'easy-peasy';

const channelHeight = {
  height: 'calc(100vh - 3.25rem)',
};

const MESSAGES = gql`
  query getMessages($channelName: String!, $serverId: String!) {
    getMessages(channelName: $channelName, serverId: $serverId) {
      messages {
        userName
        userId
        text
        date
        time
      }
    }
  }
`;

const ADD_MESSAGE = gql`
  mutation addMessage($userName: String!, $userId: String!, $serverId: String!, $channelName: String!, $text: String!, $date: String!, $time: String!) {
    addMessage(userName: $userName, userId: $userId, serverId: $serverId, channelName: $channelName, text: $text, date: $date, time: $time) {
      userName
      userId
      text
      time
      date
    }
  }
`;

function Chat() {
  const selectedServer = useStoreState((state) => state.user.selectedServer);
  const selectedChannel = useStoreState((state) => state.user.selectedChannel);
  const user = useStoreState((state) => state.user.user);

  const [addMessage, { data: addedMessage }] = useMutation(ADD_MESSAGE);

  const [message, setMessage] = useState('');

  const { loading, data, error } = useQuery(MESSAGES, {
    variables: { channelName: selectedChannel, serverId: selectedServer },
  });

  return (
    <div className="w-full">
      <div style={channelHeight} className="flex flex-col justify-between">
        <div></div>
        <div>
          <div className="flex justify-center align-middle">
            <div className="w-11/12 mb-5 border-t border-gray-600">
              {data !== undefined
                ? data.getMessages.messages.map((m: any, i: any, arr: any) => {
                    if (i > 0) {
                      if (arr[i].userName === arr[i - 1].userName) {
                        return (
                          <div>
                            <div className="pt-4">{m.text}</div>
                          </div>
                        );
                      } else {
                        return (
                          <div>
                            <div>
                              {m.userName}

                              <span>
                                {m.date} {m.time}
                              </span>
                            </div>
                            <div className="pt-4">{m.text}</div>
                          </div>
                        );
                      }
                    }

                    return (
                      <div>
                        <div>
                          {m.userName}

                          <span>
                            {m.date} {m.time}
                          </span>
                        </div>
                        <div className="pt-4">{m.text}</div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
          <div className="flex justify-center align-middle">
            <div className="w-11/12 border-t border-gray-600 pt-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // addMessage({ variables: { userName: user.userName, userId: user.id, serverId: selectedServer, channelName: selectedChannel, text: message, date: $date, time: $time } });

                  const d = new Date();
                  console.log(moment.toDate);

                  setMessage('');
                }}
              >
                <input onChange={(e) => setMessage(e.target.value)} required autoFocus className="rounded-md mb-4 px-2 bg-gray-600 w-full h-10 text-gray-200" type="text" value={message} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
