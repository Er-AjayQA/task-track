export const PasswordRuleTooltip = () => {
  return (
    <div className="absolute top-0 left-full ms-2 w-80 p-4 bg-white border border-gray-200 rounded-lg shadow-2xl z-[9]">
      <ul className="text-sm text-gray-700 space-y-2">
        <li className="flex items-start">
          <span className="text-green-500 mr-2 mt-0.5">•</span>
          <span>At least 8 characters long</span>
        </li>
        <li className="flex items-start">
          <span className="text-green-500 mr-2 mt-0.5">•</span>
          <span>Include uppercase letters (A-Z)</span>
        </li>
        <li className="flex items-start">
          <span className="text-green-500 mr-2 mt-0.5">•</span>
          <span>Include lowercase letters (a-z)</span>
        </li>
        <li className="flex items-start">
          <span className="text-green-500 mr-2 mt-0.5">•</span>
          <span>Include numbers (0-9)</span>
        </li>
        <li className="flex items-start">
          <span className="text-green-500 mr-2 mt-0.5">•</span>
          <span>Include special characters (!@#$%^&* etc.)</span>
        </li>
      </ul>

      <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
        <p className="text-xs text-blue-700 flex items-start">
          <span className="text-blue-500 mr-1.5 mt-0.5">💡</span>
          <span>
            <strong>Pro Tip:</strong> Combine all character types for maximum
            security
          </span>
        </p>
      </div>
    </div>
  );
};
