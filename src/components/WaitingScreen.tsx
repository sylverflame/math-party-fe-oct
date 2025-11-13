import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

interface IWaitingScreen {
  title: string;
  description: string;
  content?: React.ReactNode[];
  showSpinner?: boolean;
}

export function WaitingScreen({ title, description, content, showSpinner = false }: IWaitingScreen) {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        {showSpinner && (
          <EmptyMedia variant="icon">
            <Spinner />
          </EmptyMedia>
        )}
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {content &&
        content.map((element, index) => {
          return element && <EmptyContent key={index}>{element}</EmptyContent>;
        })}
    </Empty>
  );
}

export default WaitingScreen;
