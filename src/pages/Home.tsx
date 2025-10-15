import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-page p-4 flex justify-center gap-2">
      <Button onClick={() => navigate("/app/game?type=create")}>Create New Game</Button>
      <Button onClick={() => navigate("/app/game?type=join")}>Join Game</Button>
    </div>
  );
};

export default Home;
