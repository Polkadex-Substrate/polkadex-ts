import { ReactNode } from "react";

export function Table({
  header = ["Attribute", "Description"],
  content,
}: {
  header?: string[] | ReactNode[];
  content: { [key: string]: ReactNode }[];
}) {
  return (
    <div className="mt-10">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-primary">
            {header?.map((v, i) => (
              <th className="text-left font-semibold py-2 px-2" key={i}>
                {v}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {content?.map((item, i) => (
            <tr className="text-sm" key={i}>
              {Object.values(item).map((value, j) => (
                <td
                  className={`text-left font-semibold px-2 py-2 ${
                    j === Object.values(item).length - 1 &&
                    "text-secondary border-r border-primary"
                  }`}
                  key={j}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
