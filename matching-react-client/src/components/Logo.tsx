import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to={'/'}>
      <div className="flex flex-col items-center">
        <div className="flex text-2xl font-semibold">
          <div>SignLangHub</div>
          <span className="text-red-500">.</span>
          <div className="font-bold">Booking</div>
        </div>
      </div>
    </Link>
  );
}
