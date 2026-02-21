@extends('errors.layout')

@section('icon', '🔍')
@section('code', '404')
@section('title', 'Page Not Found')
@section('description', 'The page you\'re looking for doesn\'t exist or may have been moved. Check the URL or head back to browse our products.')

@section('actions')
    <a href="{{ url('/') }}" class="btn-primary">Go Home</a>
    <a href="{{ url('/products') }}" class="btn-secondary">View Products</a>
@endsection
