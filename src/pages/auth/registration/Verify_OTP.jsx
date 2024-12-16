import React, { useState, useRef, useContext } from 'react';
import { Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Kalbela_AuthProvider } from '../../../context/MainContext';
import sweet_alert from '../../../utils/custom_alert';

const VerifyOTP = () => {
      const [otp, setOtp] = useState(['', '', '', '', '', '']);
      const inputRefs = useRef([]);
      const { user } = useContext(Kalbela_AuthProvider);

      const handleChange = (value, index) => {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to next input if current input is filled
            if (value && index < 5) {
                  inputRefs.current[index + 1].focus();
            }
      };

      const navigate = useNavigate();

      const handleKeyDown = (e, index) => {
            // Move to previous input on backspace if current input is empty
            if (e.key === 'Backspace' && !otp[index] && index > 0) {
                  inputRefs.current[index - 1].focus();
            }
      };

      const handleVerify = () => {
            const otpValue = otp.join('');
            if (otpValue.length === 6) {
                  fetch('http://localhost:5005/api/v1/auth/verify-email', {
                        method: 'POST',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ otp: otpValue, email: user.email }),
                  }).then((res) => res.json())
                        .then((data) => {
                              if (!data.error) {
                                    sweet_alert('OTP Verified', data.message, 'success');
                                    navigate('/create-workspace');
                              } else {
                                    sweet_alert('Error', data.message, 'error');
                              }
                        });
            } else {
                  sweet_alert('Error', 'Please enter a valid 6-digit OTP', 'error');
            }
      };

      const handleResend = () => {
            fetch('http://localhost:5005/api/v1/auth/regenerate-otp', {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email: user.email }),
            }).then((res) => res.json())
                  .then((data) => {
                        if (!data.error) {
                              sweet_alert('Success', data.message, 'success');
                        } else {
                              sweet_alert('Error', data.message, 'error');
                        }
                  });
      };


      const handlePaste = (e) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData("text").slice(0, 6).replace(/\D/g, ""); // Remove non-digit characters
            const newOtp = pastedData.split("").concat(Array(6 - pastedData.length).fill(""));
            setOtp(newOtp);

            const nextIndex = Math.min(pastedData.length, 5);
            inputRefs.current[nextIndex]?.focus();
      };

      return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
                  <div className="p-8 bg-white rounded-lg shadow-2xl w-full max-w-md">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Verify OTP</h2>
                        <p className="text-center text-gray-600 mb-8">
                              Enter the 6-digit code sent to your device
                        </p>
                        <div className="flex justify-between mb-6" onPaste={handlePaste}>
                              {otp.map((digit, index) => (
                                    <Input
                                          key={index}
                                          ref={(el) => (inputRefs.current[index] = el)}
                                          className="w-12 h-12 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                          value={digit}
                                          onChange={(e) => handleChange(e.target.value, index)}
                                          onKeyDown={(e) => handleKeyDown(e, index)}
                                          maxLength={1}
                                    />
                              ))}
                        </div>
                        <Button
                              type="primary"
                              onClick={handleVerify}
                              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 rounded-lg shadow-lg"
                        >
                              Verify OTP
                        </Button>
                        <p className="text-center text-gray-600 mt-6">
                              Didn't receive the code? <button onClick={handleResend} className="text-blue-500 hover:underline">Resend OTP</button>
                        </p>
                  </div>
            </div>
      );
};

export default VerifyOTP;
