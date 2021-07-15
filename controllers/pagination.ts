export default (data: any) => {
    const process: any = {}

    if (data.current_page) process.current = data.current_page
    if (data.total_pages) process.total = data.total_pages
    if (data.count) process.count = data.count

    return process
}
