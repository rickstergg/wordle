type EmptyRowProps = {
  row: number;
  size: number;
};

export const EmptyRow = ({ row, size }: EmptyRowProps) => {
  let cells = new Array(size).fill("");
  return (
    <div className="row">
      {cells.map((_, index) => {
        return (
          <div key={`row-${row}-index-${index}`} className={"letter-box"}></div>
        );
      })}
    </div>
  );
};
