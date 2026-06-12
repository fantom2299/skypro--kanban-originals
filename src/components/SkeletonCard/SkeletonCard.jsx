import {
  Card,
  CardTop,
  Badge,
  Dots,
  Line,
  LineShort,
  LineTiny,
} from './SkeletonCard.styles';

export default function SkeletonCard() {
  return (
    <Card>
      <CardTop>
        <Badge />
        <Dots />
      </CardTop>

      <Line />
      <LineShort />
      <LineTiny />
    </Card>
  );
}