import { Progress } from "flowbite-react";

export const PasswordProgressBar = ({
  passwordStrengthValue,
  progressColor,
  progressCount,
}) => {
  if (!progressCount || progressCount === 0) {
    return null;
  }

  return (
    <div className="mt-2">
      <Progress
        progress={progressCount}
        color={progressColor}
        size="sm"
        textLabel={passwordStrengthValue}
        textLabelPosition="outside"
        labelText
      />
    </div>
  );
};
