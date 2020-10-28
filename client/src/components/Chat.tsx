import React, { useEffect, useState } from 'react';
import { LocalDate, LocalTime } from '@js-joda/core';
import { gql, useMutation, useQuery, DataProxy } from '@apollo/client';
import { useStoreState } from 'easy-peasy';

const channelHeight = {
  height: 'calc(100vh - 3.25rem)',
};

const MESSAGES = gql`
  query getMessages($channelName: String!, $serverId: String!) {
    getMessages(channelName: $channelName, serverId: $serverId) {
      id
      channelName
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
  mutation addMessage($userName: String!, $userId: String!, $serverId: String!, $channelName: String!, $text: String!, $date: String!, $time: String!, $topic: String!) {
    addMessage(userName: $userName, userId: $userId, serverId: $serverId, channelName: $channelName, text: $text, date: $date, time: $time, topic: $topic)
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription subscriptionMessage($topic: String!) {
    subscriptionMessage(topic: $topic) {
      id
      channelName
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

function Chat() {
  const selectedServer = useStoreState((state) => state.user.selectedServer);
  const selectedChannel = useStoreState((state) => state.user.selectedChannel);
  const user = useStoreState((state) => state.user.user);

  const [addMessage, { data: addedMessage }] = useMutation(ADD_MESSAGE);

  const [message, setMessage] = useState('');

  // const { data: updatedData } = useSubscription(MESSAGE_SUBSCRIPTION, { variables: { topic: `${selectedServer}-${selectedChannel}` } });

  const { loading, data, subscribeToMore } = useQuery(MESSAGES, {
    variables: { channelName: selectedChannel, serverId: selectedServer },
  });

  useEffect(() =>
    subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      variables: { topic: `${selectedServer}-${selectedChannel}` },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const data = subscriptionData.data;
        return Object.assign({}, prev, {
          allMessages: [...data.subscriptionMessage.messages, ...prev.getMessages.messages].slice(0, 20),
        });
      },
    }),
  );

  let messages: any = [];
  if (data !== undefined) {
    console.log(data);

    messages = data.getMessages.messages;
  }

  return (
    <div className="w-full">
      <div style={channelHeight} className="flex flex-col justify-between">
        <div></div>
        <div>
          <div className="flex justify-center align-middle">
            <div className="w-11/12 mb-5 border-t border-gray-600">
              {messages.map((m: any, i: any, arr: any) => {
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
              })}
            </div>
          </div>
          <div className="flex justify-center align-middle">
            <div className="w-11/12 border-t border-gray-600 pt-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addMessage({ variables: { userName: user.userName, userId: user.id, serverId: selectedServer, channelName: selectedChannel, text: message, date: LocalDate.now().toString(), time: LocalTime.now().toString(), topic: `${selectedServer}-${selectedChannel}` } });
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
