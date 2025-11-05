import "./Percentage.css";

interface IPercentageProps {
  title: string;
}

export const Percentage = ({ title }: IPercentageProps) => {
  let arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  return (
    <div className="percentage-container">
      <p className="percentage-title">{title}</p>
      <div className="percentage-square-list">
        {arr.map((item) => (
          <div key={item} className="percentage-square-item"></div>
        ))}
      </div>
    </div>
  );
};
