@extends('errors.layout')

@section('icon', '⚙️')
@section('code', '500')
@section('title', 'Server Error')
@section('description', 'Something went wrong on our end. Our team has been notified and is working to fix the issue. Please try again in a few moments.')

@section('actions')
    <a href="{{ url('/') }}" class="btn-primary">Go Home</a>
    <a href="javascript:window.location.reload()" class="btn-secondary">Try Again</a>
@endsection
