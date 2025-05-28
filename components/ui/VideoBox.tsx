import styled from "styled-components";

interface Props {
  video: string;
  poster: string;
  muted?: boolean;
}

const VideoBox: React.FC<Props> = ({ video, poster }) => {
  return (
    <Container autoPlay loop muted preload="none" poster={poster}>
      <source src={video} type="video/mp4" />
    </Container>
  );
};

export default VideoBox;
const Container = styled.video`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06);
`;
