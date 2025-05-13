First add **token** query params with user token
then connect to socket


1. ```User-Register``` event to register that user to his group
    - listening needs:
       1. ```user-register-error``` ⇨ for errors
       2. ```user-register-success``` ⇨ for success register

2. ```Send-Message``` event to send messages in group 
    - need ```text``` String in json like 
        ```json
            {
                "text":"a7a"
            }
        ```
    - listening needs:
        1. ```send-message-error``` ⇨ for errors
        2. ```recieve-message``` ⇨ to recieve messages 
3. ```Message-Delivered``` event to confirm message delivery 
    - need ```messageId``` String in json like 
        ```json
            {
                "messageId":"id"
            }
        ```
    - listening needs:
        1. ```message-deliveredTo-error``` ⇨ for errors
        2. ```message-deliveredTo-success``` ⇨ for confirmation 

    - **Note** : You should call that event when user recieve messages successfully

4. ```Message-Seen``` event to confirm seen
    - need ```messageId``` String in json like 
        ```json
            {
                "messageId":"id"
            }
        ```
    - listening needs:
            1. ```mmessage-seen-error``` ⇨ for errors
            2. ```message-seen-success``` ⇨ for confirmation

        - **Note** : You should call that event when user open the chat and must delivery success