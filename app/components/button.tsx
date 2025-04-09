// "use client";

// import { useEffect } from "react";

// export default function GooglePayButton() {
//   useEffect(() => {
//     const paymentsClient = new google.payments.api.PaymentsClient({ environment: "TEST" });

//     const paymentDataRequest = {
//       apiVersion: 2,
//       apiVersionMinor: 0,
//       allowedPaymentMethods: [
//         {
//           type: "CARD",
//           parameters: {
//             allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
//             allowedCardNetworks: ["VISA", "MASTERCARD"],
//           },
//           tokenizationSpecification: {
//             type: "PAYMENT_GATEWAY",
//             parameters: {
//               gateway: "example", // use "stripe", "razorpay" etc. if supported
//               gatewayMerchantId: "exampleGatewayMerchantId",
//             },
//           },
//         },
//       ],
//       merchantInfo: {
//         merchantId: "12345678901234567890", // Use "TEST" or your production merchant ID
//         merchantName: "Bhromon Tori",
//       },
//       transactionInfo: {
//         totalPriceStatus: "FINAL",
//         totalPriceLabel: "Total",
//         totalPrice: "4499.00",
//         currencyCode: "INR",
//         countryCode: "IN",
//       },
//     };

//     paymentsClient.isReadyToPay({ allowedPaymentMethods: paymentDataRequest.allowedPaymentMethods })
//       .then(response => {
//         if (response.result) {
//           const button = paymentsClient.createButton({
//             onClick: () => onGooglePaymentButtonClicked(paymentDataRequest, paymentsClient),
//           });
//           document.getElementById("google-pay-button")?.appendChild(button);
//         }
//       });
//   }, []);

//   const onGooglePaymentButtonClicked = async (paymentDataRequest: any, paymentsClient: any) => {
//     try {
//       const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);
//       console.log("Payment Success", paymentData);

//       // Send this to your backend for verification and fulfillment
//       await fetch("/api/verify-payment", {
//         method: "POST",
//         body: JSON.stringify({ paymentData }),
//         headers: { "Content-Type": "application/json" },
//       });
//     } catch (err) {
//       console.error("Payment Failed", err);
//     }
//   };

//   return <div id="google-pay-button" />;
// }
