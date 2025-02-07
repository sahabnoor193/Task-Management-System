import TaskCard from '@components/TaskCard';



const tasks = [
  {
    title: "Delivery App Kit",
    description: "Create a delivery UI kit called FoodNow.",
    progress: 65,
    team: ["https://i.pravatar.cc/40?img=1", "https://i.pravatar.cc/40?img=2"],
  },
  {
    title: "Dribbble Shot",
    description: "Design a Dribbble shot for a project management UI.",
    progress: 80,
    team: ["https://i.pravatar.cc/40?img=3"],
  },
];

const HomePage = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Today's Tasks</h2>
      <div className="grid grid-cols-2 gap-4">
        {tasks.map((task, index) => (
          <TaskCard key={index} {...task} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
