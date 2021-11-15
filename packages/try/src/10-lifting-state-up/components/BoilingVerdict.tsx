export const BoilingVerdict = ({ celsius }: { celsius: number }): JSX.Element =>
  celsius >= 100 ? <p>The water would boil.</p> : <p>The water would not boil.</p>;
