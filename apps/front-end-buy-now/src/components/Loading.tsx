const Loading = () => {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black dark:border-gray-700 dark:border-t-white"></div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Carregando...</p>
      </div>
  </div>
  )
}

export default Loading;