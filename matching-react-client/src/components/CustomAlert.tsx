interface Prob {
  message: string;
  onClose: () => void;
}

export function CustomAlert({ message, onClose }: Prob) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg">{message}</p>

        <button
          onClick={onClose}
          className="mt-4 w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          확인
        </button>
      </div>
    </div>
  );
}
