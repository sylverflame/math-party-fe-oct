import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

interface IWaitingScreen {
  title: string;
  description: string;
  content?: React.ReactNode;
}

export function WaitingScreen({ title, description, content }: IWaitingScreen) {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {content && <EmptyContent>{content}</EmptyContent>}
    </Empty>
  );
}

export default WaitingScreen;
