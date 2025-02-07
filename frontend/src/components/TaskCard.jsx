const TaskCard = ({ title, description, progress, team }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md w-full">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
        
        {/* Team Members */}
        <div className="flex mt-2 space-x-2">
          {team.map((avatar, index) => (
            <img key={index} src={avatar} className="w-8 h-8 rounded-full border" alt="Team Member" />
          ))}
        </div>
  
        {/* Progress Bar */}
        <div className="mt-3 w-full bg-gray-200 h-2 rounded-full">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  };
  
  export default TaskCard;
  