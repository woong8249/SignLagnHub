import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to SignLangHub</h1>

      <div className="flex gap-4">
        {/* ConsumerPage 이동 버튼 */}
        <button
          onClick={() => navigate('/consumer')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Go to Consumer Page
        </button>

        {/* ProviderPage 이동 버튼 */}
        <button
          onClick={() => navigate('/provider')}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Go to Provider Page
        </button>
      </div>
    </div>
  );
}
