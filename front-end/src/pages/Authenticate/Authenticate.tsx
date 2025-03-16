import { useRef } from "react";
import { v4 as uuid } from 'uuid';
import { User } from "../../types/types";


const Authenticate = ({login} : { login: (user: User) => void }) => {
  const formRef = useRef<HTMLFormElement>(null);
  
  function formAction(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (formRef && formRef.current) {
      const formData = new FormData(formRef.current);
      const username = formData.get("name") as string;
      const roomname = formData.get("room") as string;
      const userData = {id: uuid(), username, roomname};

      login(userData);
    }
    formRef?.current?.reset();
  }

  return (
    <form onSubmit={formAction} ref={formRef}>
      <input type="text" name="name" placeholder="your name" />
      <input type="text" name="room" placeholder="room name" />
      <button type="submit">create</button>
    </form>
  ) 
};

export default Authenticate;
