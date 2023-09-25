import { EmptyRowProps } from "../types";

export const EmptyRow = ({ row, size }: EmptyRowProps) => {
  return (
    <div className="row">
      {Array(size)
        .fill("")
        .map((_, index) => {
          return (
            <div
              key={`row-${row}-index-${index}`}
              className={"letter-box"}
            ></div>
          );
        })}
    </div>
  );
};
