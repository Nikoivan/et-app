const EXPIRED_TIME = 300;

const generateOtpCode = (): string => String(Math.ceil(Math.random() * 10000));

const isOtpExpired = (date: Date): boolean => {
  const now = Date.now();
  const timeStamp = new Date(date).getTime();

  console.log({
    now,
    timeStamp,
    reason: (now - timeStamp) / 1000,
    EXPIRED_TIME,
    expired: now - timeStamp < EXPIRED_TIME
  });

  return (now - timeStamp) / 1000 > EXPIRED_TIME;
};

export const otpUtils = { generateOtpCode, isOtpExpired };
