// app/dashboard/[id]/payments/[paymentId]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
    ArrowLeft, 
    IndianRupee, 
    CheckCircle, 
    Clock, 
    AlertTriangle, 
    XCircle, 
    User, 
    Calendar,
    FileText,
    Building,
    Upload,
    Shield,
    BadgeCheck
} from "lucide-react";
import FarmerPaymentSubmissionForm from "@/components/Farmer_Components/payment-submission-form";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function FarmerPaymentDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    useEffect(() => {
        if (params.paymentId) {
            fetchPaymentDetails();
        }
    }, [params.paymentId]);

    const fetchPaymentDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const farmerToken = localStorage.getItem("farmerToken");

            const response = await fetch(`${API_URL}/api/farmer/payments/${params.paymentId}`, {
                headers: {
                    'Authorization': `Bearer ${farmerToken}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                setPayment(result.data);
            } else {
                throw new Error(result.message || "Failed to fetch payment details");
            }
        } catch (err) {
            console.error("Error fetching payment details:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSubmissionSuccess = (updatedPayment) => {
        setPayment(updatedPayment);
        setShowPaymentForm(false);
        fetchPaymentDetails(); // Refresh data
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case "Pending":
                return {
                    color: "yellow",
                    bgColor: "bg-yellow-50",
                    borderColor: "border-yellow-200",
                    textColor: "text-yellow-800",
                    icon: Clock,
                    message: "Payment is pending. Please complete the payment using the company-approved methods below.",
                    showPaymentMethods: true,
                    showSubmitButton: true
                };
            case "Processing":
                return {
                    color: "blue",
                    bgColor: "bg-blue-50",
                    borderColor: "border-blue-200",
                    textColor: "text-blue-800",
                    icon: Clock,
                    message: "Your payment is being processed. We'll notify you once it's verified.",
                    showPaymentMethods: false,
                    showSubmitButton: false
                };
            case "Completed":
                return {
                    color: "green",
                    bgColor: "bg-green-50",
                    borderColor: "border-green-200",
                    textColor: "text-green-800",
                    icon: CheckCircle,
                    message: "Payment completed and verified! Thank you for your payment.",
                    showPaymentMethods: false,
                    showSubmitButton: false
                };
            case "Failed":
                return {
                    color: "red",
                    bgColor: "bg-red-50",
                    borderColor: "border-red-200",
                    textColor: "text-red-800",
                    icon: XCircle,
                    message: "Payment failed. Please contact support or try again.",
                    showPaymentMethods: true,
                    showSubmitButton: true
                };
            default:
                return {
                    color: "gray",
                    bgColor: "bg-gray-50",
                    borderColor: "border-gray-200",
                    textColor: "text-gray-800",
                    icon: Clock,
                    message: "Payment status unknown.",
                    showPaymentMethods: false,
                    showSubmitButton: false
                };
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading payment details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !payment) {
        return (
            <div className="p-6">
                <div className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Failed to load payment details</h3>
                    <p className="text-muted-foreground mb-4">{error || "Payment not found"}</p>
                    <button
                        onClick={() => router.push(`/dashboard/${params.id}/payments`)}
                        className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Payments
                    </button>
                </div>
            </div>
        );
    }

    const statusConfig = getStatusConfig(payment.paymentStatus);
    const StatusIcon = statusConfig.icon;
    const showPaymentMethods = statusConfig.showPaymentMethods && payment.paymentInfo?.upiIds;
    const hasSubmissions = payment.paymentSubmissions && payment.paymentSubmissions.length > 0;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push(`/dashboard/${params.id}/payments`)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Payments
                    </button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{payment.paymentTitle}</h1>
                        <p className="text-gray-600">Payment ID: {payment._id}</p>
                    </div>
                </div>
                
                {statusConfig.showSubmitButton && (
                    <button
                        onClick={() => setShowPaymentForm(true)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
                    >
                        <Upload className="w-4 h-4" />
                        Submit Payment Proof
                    </button>
                )}
            </div>

            {/* Status Banner */}
            <div className={`${statusConfig.bgColor} ${statusConfig.borderColor} border rounded-lg p-4`}>
                <div className="flex items-center gap-3">
                    <StatusIcon className={`w-6 h-6 ${statusConfig.textColor}`} />
                    <div>
                        <h3 className={`font-semibold ${statusConfig.textColor}`}>
                            Payment Status: {payment.paymentStatus}
                        </h3>
                        <p className={`text-sm ${statusConfig.textColor} mt-1`}>
                            {statusConfig.message}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Payment Information */}
                    <div className="bg-white rounded-lg border p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            Payment Details
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <IndianRupee className="w-5 h-5 text-green-600" />
                                    <div>
                                        <p className="font-medium text-sm text-gray-600">Amount</p>
                                        <p className="text-2xl font-bold text-green-600">
                                            ₹{payment.amount?.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="font-medium text-sm text-gray-600">Created On</p>
                                        <p className="text-sm font-medium">
                                            {new Date(payment.createdAt).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Building className="w-5 h-5 text-purple-600" />
                                    <div>
                                        <p className="font-medium text-sm text-gray-600">Work Status</p>
                                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                                            {payment.workStatus}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {payment.projectManagerId?.name && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <User className="w-5 h-5 text-orange-600" />
                                        <div>
                                            <p className="font-medium text-sm text-gray-600">Project Manager</p>
                                            <p className="text-sm font-medium">{payment.projectManagerId.name}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 space-y-4 pt-6 border-t">
                            <div>
                                <p className="font-medium text-sm text-gray-600 mb-2">Description</p>
                                <p className="text-sm bg-gray-50 p-3 rounded-lg border">{payment.description}</p>
                            </div>

                            <div>
                                <p className="font-medium text-sm text-gray-600 mb-2">Reason for Payment</p>
                                <p className="text-sm bg-gray-50 p-3 rounded-lg border">{payment.reasonForPayment}</p>
                            </div>
                        </div>

                        {payment.requirements && payment.requirements.length > 0 && (
                            <div className="mt-6 pt-6 border-t">
                                <p className="font-medium text-sm text-gray-600 mb-3">Requirements</p>
                                <div className="space-y-2">
                                    {payment.requirements.map((req, index) => (
                                        <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border">
                                            <div className={`w-3 h-3 rounded-full ${req.isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                                            <span className="text-sm flex-1">{req.description}</span>
                                            {req.isCompleted && (
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Payment Submissions */}
                    {hasSubmissions && (
                        <div className="bg-white rounded-lg border p-6">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Upload className="w-5 h-5 text-green-600" />
                                Your Payment Submissions
                            </h2>
                            <div className="space-y-4">
                                {payment.paymentSubmissions.map((submission, index) => (
                                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="space-y-1">
                                                <p className="font-medium text-gray-900">
                                                    Submitted on {new Date(submission.submittedAt).toLocaleString('en-IN')}
                                                </p>
                                                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                                                    <span>Method: {submission.paymentMethod}</span>
                                                    {submission.transactionId && (
                                                        <>
                                                            <span>•</span>
                                                            <span>Transaction ID: {submission.transactionId}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="font-medium text-sm text-gray-600 mb-2">
                                                    Payment Screenshot
                                                </p>
                                                <div className="border rounded-lg p-3 bg-white">
                                                    <img
                                                        src={submission.screenshot}
                                                        alt="Payment Screenshot"
                                                        className="rounded-md object-cover w-full h-32 cursor-pointer hover:opacity-90 transition-opacity"
                                                        onClick={() => window.open(submission.screenshot, '_blank')}
                                                    />
                                                    <button
                                                        className="w-full mt-2 text-sm text-blue-600 hover:text-blue-800"
                                                        onClick={() => window.open(submission.screenshot, '_blank')}
                                                    >
                                                        View Full Size
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                {submission.additionalNotes && (
                                                    <div>
                                                        <p className="font-medium text-sm text-gray-600">
                                                            Additional Notes
                                                        </p>
                                                        <p className="text-sm bg-white p-2 rounded border">
                                                            {submission.additionalNotes}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Payment Methods - Only show for pending/failed status */}
                    {showPaymentMethods && (
                        <div className="bg-white rounded-lg border p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-green-600" />
                                Company Payment Methods
                            </h3>
                            <div className="space-y-4">
                                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                    <p className="text-sm font-medium text-green-800 text-center">
                                        💡 Use only company-approved payment methods for security
                                    </p>
                                </div>
                                
                                {/* Show only the first payment method */}
                                {payment.paymentInfo.upiIds.slice(0, 1).map((upi, index) => (
                                    <div key={index} className="p-4 border border-green-200 rounded-lg bg-green-50 text-center">
                                        <p className="font-medium text-green-800 text-sm mb-2">{upi.provider}</p>
                                        <p className="text-lg font-bold text-green-600 break-all my-2">
                                            {upi.upiId}
                                        </p>
                                        {upi.qrCode && (
                                            <div className="mt-3">
                                                <p className="text-sm text-gray-600 mb-2">Scan QR Code</p>
                                                <img
                                                    src={upi.qrCode}
                                                    alt="QR Code"
                                                    className="mx-auto border-2 border-green-300 rounded-lg w-32 h-32 object-contain"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Verification Status */}
                    {payment.paymentStatus === "Completed" && payment.verifiedBy && (
                        <div className="bg-white rounded-lg border p-6">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <BadgeCheck className="w-5 h-5 text-green-600" />
                                Payment Verified
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                                    <span className="text-sm font-medium">Verified By</span>
                                    <span className="text-sm">{payment.verifiedBy?.name}</span>
                                </div>
                                {payment.verifiedAt && (
                                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                                        <span className="text-sm font-medium">Verified At</span>
                                        <span className="text-sm">
                                            {new Date(payment.verifiedAt).toLocaleDateString('en-IN')}
                                        </span>
                                    </div>
                                )}
                                {payment.verificationNotes && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-2">Verification Notes</p>
                                        <p className="text-sm bg-gray-50 p-2 rounded border">
                                            {payment.verificationNotes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Payment Submission Form */}
            {showPaymentForm && (
                <FarmerPaymentSubmissionForm
                    paymentId={params.paymentId}
                    onSuccess={handlePaymentSubmissionSuccess}
                    onClose={() => setShowPaymentForm(false)}
                />
            )}
        </div>
    );
}