type Props = {
  message?: string;
};

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="min-h-8/10 flex items-center justify-center my-36">
      <p className="text-2xl font-bold">{message}</p>
    </div>
  );
}
