@extends('errors.layout')

@section('icon', '⛔')
@section('code', '405')
@section('title', 'Method Not Allowed')
@section('description', 'This request method is not supported for this URL. Please use the correct HTTP method or navigate back to continue.')

@section('actions')
    <a href="{{ url('/') }}" class="btn-primary">Go Home</a>
    @if(isset($_SERVER['HTTP_REFERER']))
        <a href="{{ $_SERVER['HTTP_REFERER'] }}" class="btn-secondary">Go Back</a>
    @endif
@endsection
