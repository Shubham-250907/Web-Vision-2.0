export interface FeeCalculationParams {
  service: 'fresh' | 'reissue' | 'pcc' | 'surrender';
  ageGroup: 'adult' | 'minor' | 'senior';
  pages: 36 | 60;
  scheme: 'normal' | 'tatkaal';
  optSmsAlerts: boolean;
}

export function calculatePassportFee(params: FeeCalculationParams): {
  baseFee: number;
  tatkaalSurcharge: number;
  smsFee: number;
  totalFee: number;
} {
  let baseFee = 1500;
  let tatkaalSurcharge = 0;
  const smsFee = params.optSmsAlerts ? 50 : 0;

  if (params.service === 'pcc') {
    return { baseFee: 500, tatkaalSurcharge: 0, smsFee, totalFee: 500 + smsFee };
  }

  if (params.service === 'surrender') {
    return { baseFee: 1000, tatkaalSurcharge: 0, smsFee: 0, totalFee: 1000 };
  }

  // Fresh / Reissue
  if (params.ageGroup === 'minor') {
    baseFee = 1000;
    if (params.scheme === 'tatkaal') {
      tatkaalSurcharge = 2000;
    }
  } else {
    // Adult or Senior
    if (params.pages === 60) {
      baseFee = 2000;
    } else {
      baseFee = 1500;
    }

    if (params.scheme === 'tatkaal') {
      tatkaalSurcharge = 2000;
    }

    // Senior citizen discount on normal fresh
    if (params.ageGroup === 'senior' && params.scheme === 'normal') {
      baseFee = Math.round(baseFee * 0.9); // 10% concession
    }
  }

  const totalFee = baseFee + tatkaalSurcharge + smsFee;

  return {
    baseFee,
    tatkaalSurcharge,
    smsFee,
    totalFee
  };
}
