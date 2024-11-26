interface CustomAlertProps {
  message: string;
  onConfirm: () => void; // 신청 버튼 핸들러
  onCancel: () => void; // 취소 버튼 핸들러
}

export function CustomAlert({ message, onConfirm, onCancel }: CustomAlertProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <p className="text-lg font-medium text-gray-800">{message}</p>

        <div className="mt-6 flex gap-4">
          {/* 확인 버튼 */}
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            확인
          </button>

          {/* 취소 버튼 */}
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
