import React, { ReactNode } from "react";
import { Store } from "../../components/hoc/CentralStore";

interface MyProps {
  name: string;
  children: ReactNode;
}

export default React.memo((props: MyProps) => {
  return (
    <Store.Consumer>
      {(value: any) =>
        value[`count${props.name}`] ? (
          <>{props.children}</>
        ) : (
            <div className="empty_wish_list">{`Your ${props.name} is Empty`}</div>
          )
      }
    </Store.Consumer>
  );
});
