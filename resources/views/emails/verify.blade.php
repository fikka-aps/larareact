<!-- resources/views/emails/verify.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <title>Email Verification</title>
</head>
<body>
    <p>Please click the following link to verify your email:</p>
    <a href="{{ $verificationUrl }}">Verify Email</a>
</body>
</html>
