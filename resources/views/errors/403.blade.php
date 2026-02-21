@extends('errors.layout')

@section('icon', '🚫')
@section('code', '403')
@section('title', 'Access Forbidden')
@section('description', 'You don\'t have permission to access this page. If you believe this is a mistake, please contact our support team.')

@section('actions')
    <a href="{{ url('/') }}" class="btn-primary">Go Home</a>
    <a href="{{ url('/contact') }}" class="btn-secondary">Contact Us</a>
@endsection
