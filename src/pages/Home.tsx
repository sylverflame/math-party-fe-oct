import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-page p-4 flex flex-col justify-center gap-2">
      <Logo></Logo>
      <Button variant="secondary" onClick={() => navigate("/app/game?type=join")}>{"Join Game"}</Button>
      <Button onClick={() => navigate("/app/game?type=create")}>{"Create Game"}</Button>
    </div>
  );
};

export default Home;
