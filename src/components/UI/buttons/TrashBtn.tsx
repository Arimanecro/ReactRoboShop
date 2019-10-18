import React from "react";

export default function TrashBtn(props: any) {
  return (
    <label
      onClick={() => {
        props.transformCSS({ transformCSS: "102" });
      }}
      htmlFor="del_wish"
      className="del_wish"
    >
      <button name="delete" />
    </label>
  );
}
