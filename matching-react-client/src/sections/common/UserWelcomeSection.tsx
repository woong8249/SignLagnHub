import { User } from '@typings/User';

interface Prob {
    user :User
}

export function UserWelcomeSection({ user }:Prob) {
  const { role, profileImage, name } = user;

  return (
    <div>
      <div className='text-gray-100 mb-2 '>
        <img src={profileImage} alt="profile" className='w-[100px]  border rounded-xl mb-2 ' />
        <span className="text-2xl">{name}</span>
        <span>{`${role === 'provider' ? ' 통역사 님' : ' 님'}`}</span>
      </div>

      <div className='text-white' >반갑습니다. 오늘도 즐거운 하루 되세요.</div>
    </div>
  );
}
